/**
 * @author alpharaoh
 * @summary Testing registration and login validations
 */

package unit_tests;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;
import informed_validation.InformedValidation;

public class login_reg_test {
	InformedValidation validation;

	@Before
	public void initValidationClass() {
		this.validation = new InformedValidation();
	}
	
	@Test
	public void emailValidation() {
		
		assertTrue(validation.validateEmail("thisisagmail@gmail.com"));
		assertTrue(validation.validateEmail("email@outlook.com"));
		assertTrue(validation.validateEmail("a@g.com"));
		
		assertFalse(validation.validateEmail("@."));
		assertFalse(validation.validateEmail("a@gasdas.o"));
		assertFalse(validation.validateEmail("agasdas@.o"));
		assertFalse(validation.validateEmail("\"aga's-das@..o"));
	}
	
	@Test
	public void passwordValidation() {

		assertTrue(validation.validatePassword("password123"));
		assertTrue(validation.validatePassword("Password123"));
		assertTrue(validation.validatePassword("Password123&$@£"));

		assertFalse(validation.validatePassword("password")); //must have number
		assertFalse(validation.validatePassword(" Password123"));
		assertFalse(validation.validatePassword("Pass"));
		assertFalse(validation.validatePassword("@."));
		assertFalse(validation.validatePassword("ao"));
		assertFalse(validation.validatePassword("password123\""));
		assertFalse(validation.validatePassword(".."));
	}
	
	@Test
	public void nameValidation() {

		assertTrue(validation.validateName("Akaam Shamerany"));
		assertTrue(validation.validateName("Akaam"));
		assertTrue(validation.validateName("al"));
		assertTrue(validation.validateName("This is' a WierdName"));

		
		assertFalse(validation.validateName("@."));
		assertFalse(validation.validateName("a@gFas.o"));
		assertFalse(validation.validateName("ags£%$£.o"));
		assertFalse(validation.validateName("Bad Characters;\""));
	}
	
	@Test
	public void genderValidation() {

		assertTrue(validation.validateGender("male"));
		assertTrue(validation.validateGender("Male"));
		assertTrue(validation.validateGender("mAlE"));
		assertTrue(validation.validateGender("female"));
		assertTrue(validation.validateGender("Female"));
		assertTrue(validation.validateGender("fEmAlE"));

		assertFalse(validation.validateGender("Malee"));
		assertFalse(validation.validateGender("Female;"));
		assertFalse(validation.validateGender("fFemale"));
	}
	
}
