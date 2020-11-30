package informed;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import informed_validation.InformedValidation;
import jdbc_sql_informed.Driver;
import security_informed.Hashing;

/**
 * Servlet implementation class InformedRegister
 */
@WebServlet("/registration")
public class InformedRegister extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public InformedRegister() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		Driver driver = new Driver();
		InformedValidation validation = new InformedValidation();
		
		String email = request.getParameter("email");
		String name = request.getParameter("name");
		String password = request.getParameter("password");
		String gender = request.getParameter("gender");
					
		if (validation.validateEmail(email) && 
				validation.validatePassword(password) && 
				validation.validateGender(gender) && 
				validation.validateName(name)) {
			
			Hashing hash = new Hashing();
						
			try {
				String[] passwordAndSalt = hash.hashPassword(password);
				
				driver.addUser(name, email, passwordAndSalt[0], gender, passwordAndSalt[1]);

				response.getWriter().append("{\n"
						+ "	\"success\": \"true\"\n"
						+ "}");

				
			} catch (Exception e) {
				e.printStackTrace();
				response.getWriter().append("{\n"
						+ "	\"success\": \"false\"\n"
						+ "}");
			}
			
		} else {
			response.getWriter().append("{\n"
					+ "	\"success\": \"false\"\n"
					+ "}");
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}
}
