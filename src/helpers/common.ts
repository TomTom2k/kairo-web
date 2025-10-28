/**
 * Utility functions for common operations
 */

/**
 * Shows the settings modal by setting the URL hash
 * This function can be reused anywhere in the application
 */
export const showSettingsModal = (): void => {
  if (typeof window !== "undefined") {
    window.location.hash = "#showSettingModal";
  }
};

/**
 * Hides the settings modal by removing the URL hash
 */
export const hideSettingsModal = (): void => {
  if (
    typeof window !== "undefined" &&
    window.location.hash === "#showSettingModal"
  ) {
    window.history.replaceState(null, "", window.location.pathname);
  }
};

/**
 * Checks if the settings modal should be open based on URL hash
 */
export const isSettingsModalOpen = (): boolean => {
  if (typeof window !== "undefined") {
    return window.location.hash === "#showSettingModal";
  }
  return false;
};

/**
 * Generic function to show any modal by hash
 * @param modalHash - The hash identifier for the modal (e.g., '#showSettingsModal')
 */
export const showModalByHash = (modalHash: string): void => {
  if (typeof window !== "undefined") {
    window.location.hash = modalHash;
  }
};

/**
 * Generic function to hide any modal by hash
 * @param modalHash - The hash identifier for the modal (e.g., '#showSettingsModal')
 */
export const hideModalByHash = (modalHash: string): void => {
  if (typeof window !== "undefined" && window.location.hash === modalHash) {
    window.history.replaceState(null, "", window.location.pathname);
  }
};
