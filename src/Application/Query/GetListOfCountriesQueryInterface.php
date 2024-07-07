<?php

namespace App\Application\Query;

interface GetListOfCountriesQueryInterface
{
    public function __invoke(): array;
}