<?php

declare(strict_types=1);

namespace App\UserInterface\Symfony\Rest\Controller;

use App\Application\Query\GetUsersByDatesQueryInterface;
use App\Application\Request\DatesRequest;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class GetChartDataController
{
    public function __construct(
        private GetUsersByDatesQueryInterface $getUsersByDatesQuery
    ) {
    }

    public function __invoke(Request $request): JsonResponse
    {
        $dateFrom = $request->query->get('dateFrom');
        $dateTo   = $request->query->get('dateTo');

        $data = $this->getUsersByDatesQuery
            ->__invoke(
                new DatesRequest(
                    $dateFrom,
                    $dateTo
                )
            );

        if ($data === null) {
            return new JsonResponse([]);
        }

        return new JsonResponse(
            [
                'users'  => $data->getUsers(),
                'counts' => $data->getCountOfUsersByCountries(),
            ]
        );
    }
}