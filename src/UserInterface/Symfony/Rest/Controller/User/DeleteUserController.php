<?php

declare(strict_types=1);

namespace App\UserInterface\Symfony\Rest\Controller\User;

use App\Application\Query\DoesUserExistQueryInterface;
use App\Application\Request\UserIdRequest;
use App\Application\Service\UserService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DeleteUserController
{
    public function __construct(
        private UserService $userService,
        private DoesUserExistQueryInterface $doesUserExistQuery
    ) {}
    public function __invoke(Request $request): JsonResponse
    {
        $userIdRequest = new UserIdRequest($request->get('id'));

        $userExist = $this->doesUserExistQuery->__invoke($userIdRequest);

        if (!$userExist) {
            return new JsonResponse(null, Response::HTTP_NOT_FOUND);
        }

        $this->userService->deleteUser($userIdRequest);

        return new JsonResponse(null, Response::HTTP_ACCEPTED);
    }
}