#!/bin/bash

# Script de configuration de la base de données DevHubShare
# Ce script doit être exécuté avec sudo : sudo bash setup-database.sh

echo "Configuration de la base de données DevHubShare..."

# Créer la base de données et l'utilisateur
sudo mysql -u root << EOF
-- Créer la base de données
CREATE DATABASE IF NOT EXISTS devhubshare DEFAULT CHARACTER SET utf8;

-- Créer l'utilisateur et lui donner tous les privilèges
CREATE USER IF NOT EXISTS 'devhubshare_user'@'localhost' IDENTIFIED BY 'devhubshare_password';
GRANT ALL PRIVILEGES ON devhubshare.* TO 'devhubshare_user'@'localhost';
FLUSH PRIVILEGES;

-- Afficher un message de confirmation
SELECT 'Base de données et utilisateur créés avec succès!' AS Status;
EOF

if [ $? -eq 0 ]; then
    echo ""
    echo "✓ Base de données créée avec succès!"
    echo ""
    echo "Création des tables..."

    # Importer le schéma de la base de données
    sudo mysql -u root devhubshare < database.sql

    if [ $? -eq 0 ]; then
        echo "✓ Tables créées avec succès!"
        echo ""
        echo "Configuration terminée! Vous pouvez maintenant lancer l'application avec 'npm run dev'"
    else
        echo "✗ Erreur lors de la création des tables"
        exit 1
    fi
else
    echo "✗ Erreur lors de la création de la base de données"
    exit 1
fi
