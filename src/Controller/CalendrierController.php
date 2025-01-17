<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class CalendrierController extends AbstractController
{
    #[Route('/calendrier', name: 'app_calendrier')]
    public function index(Request $request, SessionInterface $session): Response
    {
        if ($request->isMethod('POST')) {
            // Récupération des données du formulaire
            $formData = $request->request->all();

            // Récupérer les données de réservation stockées dans la session
            $data = $session->get('reservation_data', []);
            $date = $request->request->get('dateDuJour');

            // Stocker les données dans la session
            $session->set('reservation_data2', $formData);

            $session->set('reservation_date3', $date);


            // Rediriger vers la page du calendrier
            return $this->redirectToRoute('app_recapitulatif');
        }

        return $this->render('calendrier/index.html.twig', [
            'controller_name' => 'CalendrierController',
        ]);
    }
}
