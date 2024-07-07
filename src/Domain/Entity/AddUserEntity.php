<?php

declare(strict_types=1);

namespace App\Domain\Entity;

use App\Domain\ValueObject\CountryId;
use App\Domain\ValueObject\Date;
use App\Domain\ValueObject\Name;

class AddUserEntity
{
    private function __construct(
        private Name $firstName,
        private Name $lastName,
        private Date $birthDate,
        private CountryId $countryId
    ) {

    }

    public static function instantiate(
        Name $firstName,
        Name $lastName,
        Date $birthDate,
        CountryId $countryId
    ): self {
        //add domain logic here

        return new self(
            $firstName,
            $lastName,
            $birthDate,
            $countryId
        );
    }

    public function toArray()
    {
        return [
            'firstName' => $this->firstName->toString(),
            'lastName'  => $this->lastName->toString(),
            'birthDate' => $this->birthDate->toString(),
            'countryId' => $this->countryId->toInt(),
        ];
    }
}