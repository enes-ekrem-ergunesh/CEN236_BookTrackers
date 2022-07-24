<?php
/**
 * @OA\Get(path="/authors", tags={"authors"}, security={{"ApiKeyAuth": {}}},
 *         summary="Return all authors from the API (Admin only).",
 *         @OA\Parameter(in="query", name="search", description="Search critieri"),
 *         @OA\Response( response=200, description="List of authors.")
 * )
 */
Flight::route('GET /authors', function(){
  // who is the user who calls this method?
  $user = Flight::get('user');
  Flight::json(Flight::authorService()->get_all($user));
});

/**
 * @OA\Get(path="/authors/{id}", tags={"authors"}, security={{"ApiKeyAuth": {}}},
 *     summary="Return Individual author from the API (Admin only).",
 *     @OA\Parameter(in="path", name="id", example=1, description="Id of author"),
 *     @OA\Response(response="200", description="Fetch individual author")
 * )
 */
Flight::route('GET /authors/@id', function($id){
  // who is the user who calls this method?
  $user = Flight::get('user');
  Flight::json(Flight::authorService()->get_by_id($user, $id));
});

/**
  * @OA\Post(
  *     path="/authors", security={{"ApiKeyAuth": {}}},
 *     summary="Add author to the API (Admin only).",
  *     description="Add user author",
  *     tags={"authors"},
  *     @OA\RequestBody(description="Basic author info", required=true,
  *       @OA\MediaType(mediaType="application/json",
  *    			@OA\Schema(
  *    				@OA\Property(property="name", type="string", example="test",	description="Name of the author"),
  *    				@OA\Property(property="bio", type="string", example="English",	description="author's bio"),
  *    				@OA\Property(property="cover", type="string", example="cover-link",	description="author's cover"),
  *           @OA\Property(property="user_id", type="number", example="1",	description="ID of the user who added the author to the database" ),
  *        )
  *     )),
  *     @OA\Response(
  *         response=200,
  *         description="author that has been created"
  *     ),
  *     @OA\Response(
  *         response=500,
  *         description="Error"
  *     )
  * )
*/
Flight::route('POST /authors', function(){
  // who is the user who calls this method?
  $user = Flight::get('user');
  Flight::json(Flight::authorService()->add($user, Flight::request()->data->getData()));
});

/**
  * @OA\Put(
  *     path="/authors/{id}", security={{"ApiKeyAuth": {}}},
 *     summary="Update author in the API (Admin only).",
  *     description="Update user author",
  *     tags={"authors"},
  *     @OA\Parameter(in="path", name="id", example=1, description="author ID"),
  *     @OA\RequestBody(description="Basic author info", required=true,
  *       @OA\MediaType(mediaType="application/json",
  *    			@OA\Schema(
  *    				@OA\Property(property="name", type="string", example="test",	description="Name of the author"),
  *    				@OA\Property(property="bio", type="string", example="English",	description="author's bio"),
  *    				@OA\Property(property="cover", type="string", example="cover-link",	description="author's cover"),
  *           @OA\Property(property="user_id", type="number", example="1",	description="ID of the user who added the author to the database" ),
  *        )
  *     )),
  *     @OA\Response(
  *         response=200,
  *         description="author that has been updated"
  *     ),
  *     @OA\Response(
  *         response=500,
  *         description="Error"
  *     )
  * )
*/
Flight::route('PUT /authors/@id', function($id){
  // who is the user who calls this method?
  $user = Flight::get('user');  
  $data = Flight::request()->data->getData();
  Flight::json(Flight::authorService()->update($user, $id, $data));
});

/**
  * @OA\Delete(
  *     path="/authors/{id}", security={{"ApiKeyAuth": {}}},
 *     summary="Delete author from the API (Admin only).",
  *     description="Delete author",
  *     tags={"authors"},
  *     @OA\Parameter(in="path", name="id", example=1, description="author ID"),
  *     @OA\Response(
  *         response=200,
  *         description="author deleted"
  *     ),
  *     @OA\Response(
  *         response=500,
  *         description="Error"
  *     )
  * )
*/
Flight::route('DELETE /authors/@id', function($id){
  // who is the user who calls this method?
  $user = Flight::get('user');
  Flight::authorService()->delete($user, $id);
  Flight::json(["message" => "deleted"]);
});

?>
