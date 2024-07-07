<?php

declare(strict_types=1);

namespace App\Application\Response;

class CountOfUsersByCountryResponse
{
    public function __construct(
        private array $users,
        private array $countOfUsersByCountries
    ) {}

    public function getCountOfUsersByCountries(): array
    {
        return $this->countOfUsersByCountries;
    }

    public function getUsers(): array
    {
        return $this->users;
    }
}