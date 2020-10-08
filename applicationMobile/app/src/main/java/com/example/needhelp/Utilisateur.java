package com.example.needhelp;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import sun.net.www.http.HttpClient;

public class Utilisateur {
    int idCateg;
    String nomCateg;

    //connection db
    public  void afficher(){
        String url = "jdbc:mysql://62.210.130.145/NeedHelpV2";
        String login = "projetI";
        String passwd = "Integration7";
        Connection cn = null;
        Statement st = null;
        ResultSet rs = null;

        try {
            Class.forName("com.mysql.jdbc.Driver");
            cn = DriverManager.getConnection(url, login, passwd);
            st = cn.createStatement();
            String sql = "SELECT * FROM categories ";

            rs = (ResultSet) st.executeQuery(sql);
            while(rs.next()) {
                idCateg = rs.getInt("idCategorie");
                nomCateg = rs.getString("nomCategorie");
                System.out.println(idCateg);
                System.out.println(nomCateg);

            }


        }
        catch(SQLException e) {
            e.printStackTrace();
        }
        catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        finally {
            try {
                cn.close();
                st.close();
            }
            catch (SQLException e2) {
                e2.printStackTrace();
            }
        }
    }

}
