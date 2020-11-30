/**
 * @author alpharoah
 * apache superset
 * Summary: This is the main connection and commands to use for communication with the mySQL server.
 */

package jdbc_sql_informed;

import java.sql.*;
import java.util.ArrayList;

public class Driver {
	Connection sql_connection;
	Statement statement;
	PreparedStatement prepUser;
	PreparedStatement prepPass;
	int nextId;

	
	public Driver() {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver"); 
			//Get a connection to database
			this.sql_connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/sql_informed", "root", "Shamshamsham123&");
			
			String addUserQuery = "INSERT INTO users (name, email, gender) VALUES (?, ?, ?)";
			
			this.prepUser = this.sql_connection.prepareStatement(addUserQuery,
					Statement.RETURN_GENERATED_KEYS);
			
			this.statement = sql_connection.createStatement();
		}
		
		catch (Exception exc) {
			exc.printStackTrace();
		}	
	}

	public void addUser(String name, String email, String hashed_pass, String gender, String salt) {		
		try {		
			this.prepUser.setString(1, name);
			this.prepUser.setString(2, email);
			this.prepUser.setString(3, gender);
			
			int affectedRows = this.prepUser.executeUpdate();
			
			if (affectedRows == 0) {
	            throw new SQLException("Creating user failed, no rows affected.");
			}

			try{
				ResultSet generatedKeys = this.prepUser.getGeneratedKeys();
				
				if (generatedKeys.next()) {
					this.nextId = generatedKeys.getInt(1);
				} else {
	                throw new SQLException("Creating user failed, no ID obtained.");
	            }
			} catch (Exception e) {
				throw e;
			}

			String addPassQuery = "INSERT INTO passwords VALUES (" 
					+ this.nextId + ", '" //Insert into passwords table
					+ hashed_pass + "', '" 
					+ salt + "')";

			this.statement.executeUpdate(addPassQuery);
			}
		catch (Exception exc) {
			exc.printStackTrace();
		}
	}
	
	public void makeUserAdmin(String email) {
		try {
			this.statement.executeUpdate("UPDATE users SET role = 'Admin' WHERE email = '" + email + "'");
			}
		
		catch (Exception exc) {
			exc.printStackTrace();
		}
	}
	
	public void makeAdminUser(String email) {
		try {			
			this.statement.executeUpdate("UPDATE users SET role = 'User' WHERE email = '" + email + "'");
			}
		
		catch (Exception exc) {
			exc.printStackTrace();
		}
	}
	
	public void deleteUser(String email) {
		try {
			this.statement.executeUpdate("DELETE FROM users WHERE email = '" + email + "'");			
		}
		catch (Exception exc) {
			exc.printStackTrace();
		}
	}
	
	public boolean checkEmailExists(String email) {
		try {
			ResultSet myRs = this.statement.executeQuery("SELECT * FROM users WHERE email = '" + email + "'");
			
			if (myRs.next() == true) {
				return true;
			}
			else {
				return false;
			}
		}
		catch (Exception exc) {
			exc.printStackTrace();
			return false;
		}
	}
	
	public String login(String email, String password) {
		try {
			ResultSet myRs = this.statement.executeQuery("SELECT hash, id FROM users JOIN passwords USING (id) WHERE email = '" + email + "'");
			myRs.next();

			if (myRs.getString("hash").equals(password)) {
				return myRs.getString("id");
				
			} else {
				return null;
			}
		}
		catch (Exception exc) {
			exc.printStackTrace();
			return null;
		}
	}
	
	public boolean auth(String email, String id) {
		try {
			ResultSet myRs = this.statement.executeQuery("SELECT id, email FROM users WHERE email = '" + email + "' AND id = '" + id + "'");
			return myRs.next();
		
		} catch (Exception exc) {
			exc.printStackTrace();
			return false;
		}
	}

	public String getSalt(String email) {
		try {
			ResultSet myRs = this.statement.executeQuery("SELECT salt FROM users u JOIN passwords p USING (id) WHERE email = '" + email + "'");
			
			if (myRs.next()) {
				return myRs.getString("salt");
			} else {
				return null;
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public ArrayList<String> getStreamersCount(String email) {
	    ArrayList<String> streamerList = new ArrayList<String>();
		
		try {
			ResultSet myRs = this.statement.executeQuery("SELECT streamer_id FROM streamers WHERE email = '" + email + "'");
			while (myRs.next()) {
				streamerList.add(myRs.getString("streamer_id"));
			} 
			
			return streamerList;
			
		} catch (Exception exc) {
			exc.printStackTrace();
			return streamerList;
		}
	}
	
	public void addStreamer(String streamerId, String email) {
		try {
			this.statement.executeUpdate("INSERT INTO streamers VALUES (DEFAULT, '" + email + "', " + streamerId + ");");
		} catch (Exception exc) {
			exc.printStackTrace();
		}
	}
	
	public void deleteStreamer(String streamerId, String email) {
		try {
			this.statement.executeUpdate("DELETE FROM streamers WHERE email = '" + email + "' AND streamer_id = " + streamerId);
		} catch (Exception exc) {
			exc.printStackTrace();
		}
	}
}
