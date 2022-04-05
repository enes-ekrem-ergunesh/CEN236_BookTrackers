<?php

class UserDao{

  private $conn;

  /**
  * constructor of dao class
  */
  public function __construct(){
    $servername = "localhost";
    $username = "root";
    $password = "memduh2PRD";
    $schema = "book_trackers";
    // $servername = "sql.freedb.tech";
    // $username = "freedb_enesekremergunesh";
    // $password = "Swm7JT\$BjpQ2eTR";
    // $schema = "freedb_cen236_booktrackers";
    $this->conn = new PDO("mysql:host=$servername;dbname=$schema", $username, $password);
    // set the PDO error mode to exception
    $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Check connection

      echo "Connected successfully!\n";

  }

  /**
  * Method used to read all user objects from database
  */
  public function get_all(){
    $stmt = $this->conn->prepare("SELECT * FROM users");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

    /**
    * Method used to read individual user objects from database
    */
    public function get_by_id($id){
      $stmt = $this->conn->prepare("SELECT * FROM users WHERE id = :id");
      $stmt->execute(['id' => $id]);
      return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

  /**
  * Method used to add user to the database
  */
  public function add($username, $email, $password, $first_name, $last_name, $avatar_id){
    $stmt = $this->conn->prepare("INSERT INTO user (username, email, password, first_name, last_name, avatar_id) VALUES (:username, :email, :password, :first_name, :last_name, :avatar_id)");
    $stmt->execute(['username' => $username, 'email' => $email, 'password' => $password, 'first_name' => $first_name, 'last_name' => $last_name, 'avatar_id' => $avatar_id]);
  }

  /**
  * Delete user record from the database
  */
  public function delete($user_id){
    $stmt = $this->conn->prepare("DELETE FROM users WHERE user_id=:user_id");
    $stmt->bindParam(':user_id', $user_id); // SQL injection prevention
    $stmt->execute();
  }

  /**
  * Update user record
  */
  public function update($user_id, $username, $email, $password, $first_name, $last_name, $avatar_id){
    $stmt = $this->conn->prepare("UPDATE users SET username=:username, email=:email, password=:password, first_name=:first_name, last_name=:last_name, avatar_id=:avatar_id WHERE user_id=:user_id");
    $stmt->execute(['user_id' => $user_id, 'username' => $username, 'email' => $email, 'password' => $password, 'first_name' => $first_name, 'last_name' => $last_name, 'avatar_id' => $avatar_id]);
  }

}

?>
