<?php

declare(strict_types=1);

namespace App\Domain\ValueObject;

use InvalidArgumentException;

class Name
{
    private const MAX_LENGTH = 255;

    private function __construct(
        private string $value
    ) {}

    public static function createFromString(string $value): self
    {
        if (trim($value) !== $value) {
            throw new InvalidArgumentException(
                "Argument $value has invalid characters (white characters)"
            );
        }

        if ($value === '') {
            throw new InvalidArgumentException(
                "Argument $value is an empty string."
            );
        }

        $length = mb_strlen($value);

        if ($length > static::MAX_LENGTH) {
            throw new InvalidArgumentException("Argument $value is too big ($length)");
        }

        return new self($value);
    }

    public function toString(): string
    {
        return $this->value;
    }
}