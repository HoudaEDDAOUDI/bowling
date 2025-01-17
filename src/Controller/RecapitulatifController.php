<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;


class RecapitulatifController extends AbstractController
{
    #[Route('/recapitulatif', name: 'app_recapitulatif')]
    public function index(Request $request, SessionInterface $session): Response
    {
        if ($request->isMethod('POST')) {

            // Ajouter un message flash pour la confirmation
            $this->addFlash('success', 'Votre réservation a été envoyée.');

            // Rediriger vers la page de réservations avec le message flash
            return $this->redirectToRoute('app_reservations');
        }
        // Récupérer les données de réservation stockées dans la session
        $data = $session->get('reservation_data', []);
        $data2 = $session->get('reservation_data2', []);
        $data3 = $session->get('reservation_data3', []);

        return $this->render('recapitulatif/index.html.twig', [
            'controller_name' => 'RecapitulatifController',
            'data' => $data,
            'data2' => $data2,
            'data3' => $data3,
        ]);
    }
}
