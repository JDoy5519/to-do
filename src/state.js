export let currentView = 'Dashboard';

export function setCurrentView(view) {
  currentView = view;
}

export function getCurrentView() {
  return currentView;
}