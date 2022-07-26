<?php

class Config {

  public static function DB_HOST(){
    return Config::get_env("DB_HOST", "booktrackers-db-mysql-dig-oce-fra1-85582-do-user-11842247-0.b.db.ondigitalocean.com");
  }
  public static function DB_USERNAME(){
    return Config::get_env("DB_USERNAME", "doadmin");
  }
  public static function DB_PASSWORD(){
    return Config::get_env("DB_PASSWORD", "AVNS_Peh18kw8jYC7EPydhrK");
  }
  public static function DB_SCHEME(){
    return Config::get_env("DB_SCHEME", "defaultdb");
  }
  public static function DB_PORT(){
    return Config::get_env("DB_PORT", "25060");
  }
  public static function JWT_SECRET(){
    return Config::get_env("JWT_SECRET", "ezcb9s8UcF");
  }

  public static function get_env($name, $default){
   return isset($_ENV[$name]) && trim($_ENV[$name]) != '' ? $_ENV[$name] : $default;
  }
}

?>
