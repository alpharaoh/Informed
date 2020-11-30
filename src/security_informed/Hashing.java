package security_informed;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

public class Hashing {
	public String[] hashPassword(String password) throws Exception{
		
		byte[] salt = createSalt(); //generate salt
		String hashedPassword = generateHash(password, "SHA-256", salt); //generate password with salt
				
		String saltToString = salt.toString();
		String[] passwordAndSalt = new String[] {hashedPassword, saltToString};
		
		return passwordAndSalt;
	}

	private static byte[] createSalt() {
		byte[] bytes = new byte[20];
		SecureRandom random = new SecureRandom();
		random.nextBytes(bytes);
		return bytes;
	}

	public String generateHash(String password, String algorithm, byte[] salt) throws NoSuchAlgorithmException {

		MessageDigest digest = MessageDigest.getInstance(algorithm);
		byte[] hash = digest.digest(password.getBytes());	
		digest.reset();
		digest.update(salt);
		return bytesToStringHex(hash);
	}
	
	private final static char[] hexArray = "0123456789ABCDEF".toCharArray();
	
	public static String bytesToStringHex(byte[] bytes) {
		char [] hexChars = new char[bytes.length * 2];
		
		for (int i = 0; i < bytes.length; i++) {
			int v = bytes[i]  & 0xFF;
			hexChars[i * 2] = hexArray[v >>> 4];
			hexChars[i * 2 + 1] = hexArray[v & 0x0F];
		}
		return new String(hexChars);
	}
}
