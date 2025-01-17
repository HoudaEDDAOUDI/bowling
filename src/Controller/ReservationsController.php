<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class ReservationsController extends AbstractController
{
    #[Route('/reservations', name: 'app_reservations')]
    public function index(Request $request, SessionInterface $session): Response
    {
        // Si le formulaire est soumis
        if ($request->isMethod('POST')) {
            // Récupération des données du formulaire
            $formData = $request->request->all();

            // Stocker les données dans la session
            $session->set('reservation_data', $formData);

            // Rediriger vers la page du calendrier
            return $this->redirectToRoute('app_calendrier');
        }

        // Afficher la page du formulaire
        return $this->render('reservations/index.html.twig', [
            'controller_name' => 'ReservationsController',
        ]);
    }
}
