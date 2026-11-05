// Kajaria Tile Quiz — State Management, Navigation History & Persistence
import { QUIZ_STEPS_CONFIG, generateQuizRecommendations, logQuizEvent } from './quizData.js';

class QuizStore {
  constructor() {
    this.subscribers = new Set();

    // Default / initial state
    this.initialState = {
      isStarted: false,
      currentStepId: 'welcome', // 'welcome' | 'space' | 'application' | 'room-context' | 'mood' | 'colors' | 'surface' | 'usage' | 'preferences' | 'results'
      answers: {
        space: 'bathroom',
        application: 'both',
        coordination: 'coordinated',
        roomSize: 'medium',
        naturalLight: 'some',
        dimensionsL: '',
        dimensionsW: '',
        mood: 'warm-natural',
        colors: ['beige-warm'],
        fittings: 'wood',
        surface: 'stone',
        usage: 'frequent-water',
        wetAreaRisk: 'yes-wet',
        preferredSize: 'recommend',
        preferredFinish: 'recommend'
      },
      history: ['welcome'],
      activeMatchIndex: 0,
      results: null,
      isSavedToProfile: false,
      userProfile: null, // { name: 'Arbaaz Khan', email: 'arbaaz@design.local' }
      dealerSearchQuery: '',
      showConfirmRestart: false,
      showProfileModal: false
    };

    // Try loading saved quiz state from localStorage
    let savedAnswers = null;
    let savedProfile = null;
    try {
      const persisted = localStorage.getItem('kajaria_quiz_state');
      if (persisted) {
        savedAnswers = JSON.parse(persisted);
      }
      const profile = localStorage.getItem('kajaria_user_profile');
      if (profile) {
        savedProfile = JSON.parse(profile);
      }
    } catch (e) {
      console.warn('Could not read localStorage for quiz state', e);
    }

    this.state = {
      ...this.initialState,
      answers: savedAnswers || this.initialState.answers,
      userProfile: savedProfile || null
    };

    // If answers were saved and we have results, compute them
    if (savedAnswers) {
      this.state.results = generateQuizRecommendations(this.state.answers);
    }
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify() {
    for (const callback of this.subscribers) {
      try {
        callback(this.state);
      } catch (err) {
        console.error('QuizStore subscriber error:', err);
      }
    }
    // Save answers to localStorage
    try {
      localStorage.setItem('kajaria_quiz_state', JSON.stringify(this.state.answers));
    } catch (e) {}
  }

  // --- Quiz Flow Navigation ---

  startQuiz() {
    this.state.isStarted = true;
    this.state.currentStepId = 'space';
    this.state.history = ['welcome', 'space'];
    logQuizEvent('quiz_started');
    logQuizEvent('step_viewed', { step: 'space' });
    this.notify();
  }

  goToStep(stepId) {
    if (this.state.currentStepId !== stepId) {
      this.state.history.push(stepId);
      this.state.currentStepId = stepId;
      logQuizEvent('step_viewed', { step: stepId });
      this.notify();
    }
  }

  goBack() {
    if (this.state.history.length > 1) {
      this.state.history.pop();
      const prevStep = this.state.history[this.state.history.length - 1];
      this.state.currentStepId = prevStep;
      this.notify();
    }
  }

  // Edit specific answer from Results chips
  editStep(stepId) {
    logQuizEvent('answers_edited', { targetStep: stepId });
    this.goToStep(stepId);
  }

  // Commit current step answer and advance to next logical step
  completeStep(stepId, updatedAnswers) {
    this.state.answers = {
      ...this.state.answers,
      ...updatedAnswers
    };

    logQuizEvent('step_completed', { step: stepId, answers: updatedAnswers });

    const stepOrder = [
      'space',
      'application',
      'room-context',
      'mood',
      'colors',
      'surface',
      'usage',
      'preferences'
    ];

    const currentIndex = stepOrder.indexOf(stepId);
    if (currentIndex >= 0 && currentIndex < stepOrder.length - 1) {
      const nextStepId = stepOrder[currentIndex + 1];
      this.goToStep(nextStepId);
    } else {
      // Reached the end -> calculate results!
      this.calculateResults();
    }
  }

  // Calculate and display recommendations
  calculateResults() {
    this.state.results = generateQuizRecommendations(this.state.answers);
    this.state.activeMatchIndex = 0;
    this.state.currentStepId = 'results';
    this.state.history.push('results');
    logQuizEvent('results_viewed', {
      space: this.state.answers.space,
      application: this.state.answers.application,
      matchesCount: this.state.results.length
    });
    this.notify();
  }

  // Switch between Option 1, Option 2, Option 3
  setActiveMatch(index) {
    this.state.activeMatchIndex = index;
    logQuizEvent('recommendation_selected', {
      index,
      title: this.state.results[index]?.title
    });
    this.notify();
  }

  // --- Profile & Persistence ---
  saveToProfile(profileData) {
    this.state.userProfile = profileData;
    this.state.isSavedToProfile = true;
    try {
      localStorage.setItem('kajaria_user_profile', JSON.stringify(profileData));
      const savedQuizzes = JSON.parse(localStorage.getItem('kajaria_saved_quizzes') || '[]');
      savedQuizzes.push({
        id: 'quiz-' + Date.now(),
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        room: this.state.answers.space,
        results: this.state.results,
        selectedMatch: this.state.results[this.state.activeMatchIndex]
      });
      localStorage.setItem('kajaria_saved_quizzes', JSON.stringify(savedQuizzes));
    } catch (e) {}

    logQuizEvent('profile_save_completed', { user: profileData.email });
    this.notify();
  }

  // --- Restart Flow ---
  confirmRestart(show) {
    this.state.showConfirmRestart = show;
    this.notify();
  }

  resetQuiz() {
    logQuizEvent('quiz_restarted');
    this.state = {
      ...this.initialState,
      userProfile: this.state.userProfile,
      history: ['welcome']
    };
    try {
      localStorage.removeItem('kajaria_quiz_state');
    } catch (e) {}
    this.notify();
  }
}

export const quizStore = new QuizStore();
