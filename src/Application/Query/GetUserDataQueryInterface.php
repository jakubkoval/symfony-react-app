<?php

namespace App\Application\Query;

use App\Application\Request\UserIdRequest;

interface GetUserDataQueryInterface
{
    public function __invoke(UserIdRequest $request);
}