<?php

declare(strict_types=1);

namespace App\Application\Request;

class UserIdRequest
{
    public function __construct(
        private string $userId
    ) {}

    public function getUserId(): string
    {
        return $this->userId;
    }

}