// Secure Authentication System
// This file should be served with proper authentication headers

class SecureAuth {
    constructor() {
        this.sessionKey = 'portfolio_auth_session';
        this.sessionTimeout = 30 * 60 * 1000; // 30 minutes
        this.initializeAuth();
    }

    // Hash function for password verification (client-side only for demo)
    // In production, this should be server-side
    async hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // Pre-computed hash of the password (in production, this should be server-side)
    async getPasswordHash() {
        // This is a demo implementation - in production, use server-side authentication
        const password = 'hiremeORregretIT';
        return await this.hashPassword(password);
    }

    // Check if user is authenticated
    isAuthenticated() {
        const session = this.getSession();
        if (!session) return false;
        
        const now = Date.now();
        if (now - session.timestamp > this.sessionTimeout) {
            this.clearSession();
            return false;
        }
        
        return true;
    }

    // Get session data
    getSession() {
        try {
            const sessionData = sessionStorage.getItem(this.sessionKey);
            return sessionData ? JSON.parse(sessionData) : null;
        } catch (e) {
            return null;
        }
    }

    // Set session data
    setSession() {
        const session = {
            authenticated: true,
            timestamp: Date.now()
        };
        sessionStorage.setItem(this.sessionKey, JSON.stringify(session));
    }

    // Clear session
    clearSession() {
        sessionStorage.removeItem(this.sessionKey);
    }

    // Authenticate user
    async authenticate(password) {
        const passwordHash = await this.getPasswordHash();
        const inputHash = await this.hashPassword(password);
        
        if (inputHash === passwordHash) {
            this.setSession();
            return true;
        }
        return false;
    }

    // Initialize authentication check
    initializeAuth() {
        if (!this.isAuthenticated()) {
            this.showPasswordModal();
        }
    }

    // Show password modal
    showPasswordModal() {
        const modal = document.getElementById('password-modal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    // Hide password modal
    hidePasswordModal() {
        const modal = document.getElementById('password-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Handle successful authentication
    onAuthSuccess() {
        this.hidePasswordModal();
        // Redirect to protected content or show it
        this.showProtectedContent();
    }

    // Show protected content
    showProtectedContent() {
        // This would show the protected content
        // For now, we'll just hide the modal
        console.log('Authentication successful - showing protected content');
    }
}

// Initialize secure authentication
const secureAuth = new SecureAuth();

// Make it globally available
window.secureAuth = secureAuth;
