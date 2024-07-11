<?php

declare(strict_types=1);

namespace App\Domain\ValueObject;

use InvalidArgumentException;

class AbstractId
{
    private function __construct(
        private int $value
    ) {

    }

    public static function createFromString(string $value): static
    {
        $intValue = filter_var($value, FILTER_VALIDATE_INT);

        if ($intValue === false) {
            throw new InvalidArgumentException("Argument $value is not an integer.");
        }

        return static::createFromInt((int)$value);
    }

    public static function createFromInt(int $value): static
    {
        if ($value <= 0) {
            throw new InvalidArgumentException("Argument $value should be greater than 0");
        }

        return new static($value);
    }

    public function toInt(): int
    {
        return $this->value;
    }

    public function toString(): string
    {
        return (string)$this->value;
    }
}