<?php

declare(strict_types=1);

namespace App\Domain\ValueObject;

use DateTimeImmutable;
use Exception;
use InvalidArgumentException;

class Date
{
    private const FORMAT = 'Y-m-d';
    public function __construct(
        private DateTimeImmutable $value,
    ) {
    }


    public static function createFromString(string $value): self
    {
        try {
            $dateTime = new DateTimeImmutable($value);
        } catch (Exception $e) {
            throw new InvalidArgumentException($e->getMessage());
        }

        return new self($dateTime);
    }

    public function toString(): string
    {
        return $this->value->format(self::FORMAT);
    }
}