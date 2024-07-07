<?php

namespace App\Application\Query;

use App\Application\Request\DatesRequest;
use App\Application\Response\CountOfUsersByCountryResponse;

interface GetUsersByDatesQueryInterface
{
    public function __invoke(DatesRequest $request): ?CountOfUsersByCountryResponse;
}