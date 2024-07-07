<?php

namespace App\UserInterface\Symfony\Rest\Controller;

use App\Application\Query\GetUserDataQueryInterface;
use App\Application\Request\UserIdRequest;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class GetUserDataController
{
    public function __construct(
        private GetUserDataQueryInterface $getUserDataQuery
    ) {}

    public function __invoke(Request $request): JsonResponse
    {
        $data = $this->getUserDataQuery
            ->__invoke(new UserIdRequest($request->get('id')));

        return new JsonResponse($data + ["country" => ['id' => 3, "name" => 'Belgium']]);
    }
}