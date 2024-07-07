<?php

declare(strict_types=1);

namespace App\UserInterface\Symfony\Http\Controller;

use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;

class DefaultController
{
    public function __construct(
        private Environment $twig
    ) {}

    public function defaultAction(): Response
    {
        return new Response(
            $this->twig->render('default/default.html.twig')
        );
    }
}