const cofactor = require('node-2fa');

export const subscribeTwoFactorAuth = ({ name, account }: { name: string, account: string }) => {
    try {
        const secret = cofactor.generateSecret({ name, account });

        if (!secret) {
            console.error("Failed to generate secret key.");
            return null;
        }

        console.log("Secret Key:", secret.secret);
        console.log("OTP Auth URL:", secret.uri); // Fixed the incorrect property

        return secret;
    } catch (error) {
        console.error("Error generating 2FA secret:", error);
        return null;
    }
};
