<?php

declare(strict_types=1);

namespace App\UserInterface\Symfony\Rest\Controller;

use App\Application\Query\GetUserDataQueryInterface;
use App\Application\Request\UserIdRequest;
use Symfony\Component\HttpFoundation\JsonResponse;

class GetUserDataController
{
    public function __construct(
        private GetUserDataQueryInterface $getUserDataQuery
    ) {}

    public function __invoke(int $id): JsonResponse
    {
        $data = $this->getUserDataQuery
            ->__invoke(new UserIdRequest($id));

        return new JsonResponse($data);
    }
}