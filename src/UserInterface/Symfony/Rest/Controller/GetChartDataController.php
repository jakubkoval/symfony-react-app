<?php

declare(strict_types=1);

namespace App\UserInterface\Symfony\Rest\Controller;

use App\Application\Query\GetUsersByDatesQueryInterface;
use App\Application\Request\DatesRequest;
use DateTime;
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
        $dateFromValue = $request->query->get('dateFrom');
        $dateToValue   = $request->query->get('dateTo');

        try {
            $dateFrom = $this->getValidDateValue($dateFromValue);
            $dateTo   = $this->getValidDateValue($dateToValue);
        } catch (\Exception $e) {
            return new JsonResponse([]);
        }

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

    private function getValidDateValue(?string $value): ?string
    {
        $dateValue = null;

        if ($value !== null) {
            $dateValue = new DateTime($value);

            return $dateValue->format('Y-m-d');
        }

        return $dateValue;
    }
}