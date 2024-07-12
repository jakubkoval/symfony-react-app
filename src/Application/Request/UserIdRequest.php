<?php

declare(strict_types=1);

namespace App\Application\Request;

class UserIdRequest
{
    public function __construct(
        private int $userId
    ) {}

    public function getUserId(): int
    {
        return $this->userId;
    }

}