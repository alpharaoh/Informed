package informed;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import informed_validation.InformedValidation;
import jdbc_sql_informed.Driver;
import security_informed.Hashing;

/**
 * Servlet implementation class InformedLogin
 */
@WebServlet("/login")
public class InformedLogin extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public InformedLogin() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub		
		InformedValidation validation = new InformedValidation();

		String email = request.getParameter("email");
		String password = request.getParameter("password");
		
		if (validation.validateEmail(email) && 
				validation.validatePassword(password)) {
			
			try {
				String loginSuccessId = tryLogin(email, password);
				
				if (loginSuccessId != null) {
					
					Driver driver = new Driver();
					
	        	    ArrayList<String> listOfStreamers = new ArrayList<String>();
	        	    
	        		listOfStreamers = driver.getStreamersCount(email);

					String text = "{\n"
							+ "	\"success\": \"true\",\n"
							+ "	\"data\": {\n"
							+ "		\"streamers\": " + listOfStreamers.toString() + "\n"
							+ "	}\n"
							+ "}";
					
					response.getWriter().append(text);
					
			        HttpSession session = request.getSession();
			        
			        session.setAttribute("id", loginSuccessId);
			        session.setAttribute("email", email);
			        
			        String streamerToCookie = (listOfStreamers.toString().substring(1, listOfStreamers.toString().length()-1)).replace(',', '-').replaceAll("\\s+","");
			        response.addCookie(new Cookie("streamers", streamerToCookie));
			        
				} else {
					String text = "{\n"
							+ "	\"success\": \"false\",\n"
							+ "	\"data\": {}\n"
							+ "}";
					
					response.getWriter().append(text);

				}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}
	
	protected String tryLogin(String email, String password) throws SQLException {
		Driver driver = new Driver();
		Hashing hash = new Hashing();
		
		String saltString = driver.getSalt(email);
		
		if (saltString == null) {
			return null;
		} else {
			
			byte[] salt = saltString.getBytes();
			
			try {
				String hashedPassword = hash.generateHash(password, "SHA-256", salt);
				String id = driver.login(email, hashedPassword);
				
				if (id != null) {
					return id; 
					
				} else {
					return null;
				}
				
			} catch (NoSuchAlgorithmException e) {
				e.printStackTrace();
			}
		}

		return null;
	}
}
