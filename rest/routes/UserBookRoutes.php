<?php
/**
 * @OA\Get(path="/userBooks", tags={"userBooks"}, security={{"ApiKeyAuth": {}}},
 *         summary="Return all userBooks from the API (Admin only).",
 *         @OA\Parameter(in="query", name="search", description="Search critieri"),
 *         @OA\Response( response=200, description="List of userBooks.")
 * )
 */
Flight::route('GET /userBooks', function(){
  // who is the user who calls this method?
  $user = Flight::get('user');
  Flight::json(Flight::userBookService()->get_all($user));
});

/**
 * @OA\Get(path="/userBooks/{id}", tags={"userBooks"}, security={{"ApiKeyAuth": {}}},
 *     summary="Return Individual userBook from the API (Admin only).",
 *     @OA\Parameter(in="path", name="id", example=1, description="Id of userBook"),
 *     @OA\Response(response="200", description="Fetch individual userBook")
 * )
 */
Flight::route('GET /userBooks/@id', function($id){
  // who is the user who calls this method?
  $user = Flight::get('user');
  Flight::json(Flight::userBookService()->get_by_id($user, $id));
});

/**
  * @OA\Post(
  *     path="/userBooks", security={{"ApiKeyAuth": {}}},
 *     summary="Add userBook to the API (Admin only).",
  *     description="Add user userBook",
  *     tags={"userBooks"},
  *     @OA\RequestBody(description="Basic userBook info", required=true,
  *       @OA\MediaType(mediaType="application/json",
  *    			@OA\Schema(
  *           @OA\Property(property="user_id", type="number", example="1",	description="ID of the user" ),
  *           @OA\Property(property="book_id", type="number", example="1",	description="ID of the book" ),
  *           @OA\Property(property="bookmark", type="number", example="null",	description="Bookmark of the book" ),
  *        )
  *     )),
  *     @OA\Response(
  *         response=200,
  *         description="userBook that has been created"
  *     ),
  *     @OA\Response(
  *         response=500,
  *         description="Error"
  *     )
  * )
*/
Flight::route('POST /userBooks', function(){
  // who is the user who calls this method?
  $user = Flight::get('user');
  Flight::json(Flight::userBookService()->add($user, Flight::request()->data->getData()));
});

/**
  * @OA\Put(
  *     path="/userBooks/{id}", security={{"ApiKeyAuth": {}}},
 *     summary="Update userBook in the API (Admin only).",
  *     description="Update user userBook",
  *     tags={"userBooks"},
  *     @OA\Parameter(in="path", name="id", example=1, description="userBook ID"),
  *     @OA\RequestBody(description="Basic userBook info", required=true,
  *       @OA\MediaType(mediaType="application/json",
  *    			@OA\Schema(
  *           @OA\Property(property="user_id", type="number", example="1",	description="ID of the user" ),
  *           @OA\Property(property="book_id", type="number", example="1",	description="ID of the book" ),
  *           @OA\Property(property="bookmark", type="number", example="null",	description="Bookmark of the book" ),
  *        )
  *     )),
  *     @OA\Response(
  *         response=200,
  *         description="userBook that has been updated"
  *     ),
  *     @OA\Response(
  *         response=500,
  *         description="Error"
  *     )
  * )
*/
Flight::route('PUT /userBooks/@id', function($id){
  // who is the user who calls this method?
  $user = Flight::get('user');  
  $data = Flight::request()->data->getData();
  Flight::json(Flight::userBookService()->update($user, $id, $data));
});

/**
  * @OA\Delete(
  *     path="/userBooks/{id}", security={{"ApiKeyAuth": {}}},
 *     summary="Delete userBook from the API (Admin only).",
  *     description="Delete userBook",
  *     tags={"userBooks"},
  *     @OA\Parameter(in="path", name="id", example=1, description="userBook ID"),
  *     @OA\Response(
  *         response=200,
  *         description="userBook deleted"
  *     ),
  *     @OA\Response(
  *         response=500,
  *         description="Error"
  *     )
  * )
*/
Flight::route('DELETE /userBooks/@id', function($id){
  // who is the user who calls this method?
  $user = Flight::get('user');
  Flight::userBookService()->delete($user, $id);
  Flight::json(["message" => "deleted"]);
});





/**
  * @OA\Post(
  *     path="/userBookToShelf/{id}", security={{"ApiKeyAuth": {}}},
 *     summary="Add userBook to the API (User's shelf).",
  *     description="Add userBook",
  *     tags={"userBooks"},
 *      @OA\Parameter(in="path", name="id", example=1, description="Id of the Book"),
  *     @OA\Response(
  *         response=200,
  *         description="userBook that has been created"
  *     ),
  *     @OA\Response(
  *         response=500,
  *         description="Error"
  *     )
  * )
*/
Flight::route('POST /userBookToShelf/@id', function($id){
  // who is the user who calls this method?
  $user = Flight::get('user');

  // check if the book exist
  $book = Flight::bookService()->get_public_book($id);
  if($book === null){    
    throw new Exception("book doesn't exist!");
  }


  Flight::userBookService()->add_userbook_to_shelf($user, $id);
  Flight::json(["message" => "added to shelf"]);
});

?>
