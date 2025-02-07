const cofactor = require('node-2fa');

export const subscribeTotp = ({ name, account }: { name: string, account: string }) => {
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


export const verifyTotp = ({secret, userCode}: {secret: string | null, userCode: string})=>{
    const result = cofactor.verifyToken(secret, userCode);
    return result !== null && result.delta !== undefined
}