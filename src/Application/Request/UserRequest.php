<?php

declare(strict_types=1);

namespace App\Application\Request;

class UserRequest
{
    public function __construct(
        private string $firstName,
        private string $lastName,
        private string $dateOfBirth,
        private string $countryId,
        private ?string $id = null
    ) {}

    public function getFirstName(): string
    {
        return $this->firstName;
    }

    public function getLastName(): string
    {
        return $this->lastName;
    }

    public function getDateOfBirth(): string
    {
        return $this->dateOfBirth;
    }

    public function getCountryId(): string
    {
        return $this->countryId;
    }

    public function getId(): ?string
    {
        return $this->id;
    }
}