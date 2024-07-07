<?php

declare(strict_types=1);

namespace App\Domain\Entity;

use App\Domain\ValueObject\CountryId;
use App\Domain\ValueObject\Date;
use App\Domain\ValueObject\Id;
use App\Domain\ValueObject\Name;

class EditUserEntity
{
    private function __construct(
        private Name $firstName,
        private Name $lastName,
        private Date $birthDate,
        private CountryId $countryId,
        private Id $id
    ) {

    }

    public static function instantiate(
        Name $firstName,
        Name $lastName,
        Date $birthDate,
        CountryId $countryId,
        Id $id
    ): self {
        //add domain logic here

        return new self(
            $firstName,
            $lastName,
            $birthDate,
            $countryId,
            $id
        );
    }

    public function updateEntity(
        Name $firstName,
        Name $lastName,
        Date $birthDate,
        CountryId $countryId
    ): void {
        //add domain logic here
        $this->firstName = $firstName;
        $this->lastName  = $lastName;
        $this->birthDate = $birthDate;
        $this->countryId = $countryId;
    }

    public function toArray()
    {
        return [
            'firstName' => $this->firstName->toString(),
            'lastName'  => $this->lastName->toString(),
            'birthDate' => $this->birthDate->toString(),
            'countryId' => $this->countryId->toInt(),
            'id'        => $this->id->toInt(),
        ];
    }
}