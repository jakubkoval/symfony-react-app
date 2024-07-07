<?php

declare(strict_types=1);

namespace App\Application\Request;

class DatesRequest
{
    public function __construct(
        private ?string $dateFrom,
        private ?string $dateTo,
    ) {}

    public function getDateFrom(): ?string
    {
        return $this->dateFrom;
    }

    public function getDateTo(): ?string
    {
        return $this->dateTo;
    }
}