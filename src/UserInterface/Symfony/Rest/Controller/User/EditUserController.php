<?php

declare(strict_types=1);

namespace App\UserInterface\Symfony\Rest\Controller\User;

use App\Application\Request\UserRequest;
use App\Application\Service\UserService;
use Exception;
use JsonException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class EditUserController
{
    public function __construct(
        private UserService $userService
    ) {}

    public function __invoke(Request $request)
    {
        try {
            $contentData = json_decode($request->getContent(), true, 512, JSON_THROW_ON_ERROR);
        } catch (JsonException $e) {
            //log $e
            return new JsonResponse([], Response::HTTP_BAD_REQUEST);
        }

        try {
            $this->userService->updateUser(new UserRequest(
                $contentData['first_name'],
                $contentData['last_name'],
                $contentData['date_of_birth'],
                $contentData['country_id'],
                $contentData['id'],
            ));
        } catch (Exception $e) {
            return new JsonResponse([], Response::HTTP_BAD_REQUEST);
        }

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}