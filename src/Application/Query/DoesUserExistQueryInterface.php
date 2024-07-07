<?php

declare(strict_types=1);

namespace App\Application\Query;

use App\Application\Request\UserIdRequest;

interface DoesUserExistQueryInterface
{
    public function __invoke(UserIdRequest $request): bool;
}