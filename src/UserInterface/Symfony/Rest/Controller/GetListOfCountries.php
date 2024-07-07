<?php

declare(strict_types=1);

namespace App\UserInterface\Symfony\Rest\Controller;

use App\Application\Query\GetListOfCountriesQueryInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

class GetListOfCountries
{
    public function __construct(
        private GetListOfCountriesQueryInterface $listOfCountriesQuery
    ) {}

    public function __invoke(): JsonResponse
    {
        return new JsonResponse($this->listOfCountriesQuery->__invoke());
    }
}