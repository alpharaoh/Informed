package informed_validation;

public class InformedValidation {	
	public boolean validateEmail(String email) {
		if (email.matches("^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$")) {
			return true;
		} else {
			return false;
		}
	}
	
	public boolean validatePassword(String password) { //Done
		if (password.matches("^(?=[a-zA-Z0-9#@$£&?]{8,}$)(?=.*?[a-z])(?=.*?[0-9]).*")) {
			return true;
		} else {
			return false;
		}
	}
	
	public boolean validateName(String name) { //Done
		if (name.matches("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$")) {
			return true;
		} else {
			return false;
		}
	}

	public boolean validateGender(String gender) { //Done
		if (gender.equalsIgnoreCase("male")) {
			return true;
		} else if (gender.equalsIgnoreCase("female")) {
			return true;
		} else {
			return false;
		}
	}
}
