package informed;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import informed_validation.InformedValidation;
import jdbc_sql_informed.Driver;

/**
 * Servlet implementation class UserAuthentication
 */
@WebServlet("/add")
public class AddStreamer extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */ 
    public AddStreamer() {
        super();
        // TODO Auto-generated constructor stub
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        Driver driver = new Driver();
        
        String errorMessage = "{\n"
				+ "	\"success\": \"false\",\n"
				+ "	\"comment\": \"error\"\n"
				+ "}";
        
        try {
	        String email = (String) session.getAttribute("email"); //from session
	        String id = (String) session.getAttribute("id"); //from session
	        
	        if (driver.auth(email, id)) {
	        	try {
	        		String streamer = request.getParameter("id"); //from url
	        		
	        		int length = driver.getStreamersCount(email).size();
	        		
	        		if (length < 3) {
	        			
	        			String text = "{\n"
								+ "	\"success\": \"true\",\n"
	        					+ "	\"comment\": \"\"\n"
								+ "}";
	        			
	        			driver.addStreamer(streamer, email);
        				response.getWriter().append(text);	
        				
	        		} else {
	        			String text = "{\n"
								+ "	\"success\": \"false\",\n"
	        					+ "	\"comment\": \"full\"\n"
								+ "}";
	        			
	        			text.trim();
	        			
        				response.getWriter().append(text);	

	        		}
					
	        	} catch (Exception exc) {
	        		exc.printStackTrace();
					response.getWriter().append(errorMessage);
	        	}
	        } else {
				response.getWriter().append("{\n"
						+ "	\"success\": \"false\",\n"
						+ "	\"comment\": \"authorization error\"\n"
						+ "}");
	        }
        } catch (Exception exc) {
        	exc.printStackTrace();
        	response.getWriter().append(errorMessage);
        }
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
