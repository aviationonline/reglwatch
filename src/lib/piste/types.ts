export interface SearchCriterion {

    valeur: string;

    typeRecherche:
        | "UN_DES_MOTS"
        | "TOUS_LES_MOTS_DANS_UN_CHAMP";

    operateur?: "ET" | "OU";

    proximite?: number;

}

export interface SearchField {

    typeChamp: string;

    operateur: "ET" | "OU";

    criteres: SearchCriterion[];

}

export interface SearchFilter {

    facette: string;

    valeurs?: string[];

    dates?: {

        start: string;

        end: string;

    };

}

export interface SearchRequest {

    recherche: {

        filtres: SearchFilter[];

        champs: SearchField[];

        sort: string;

        secondSort: string;

        pageSize: number;

        pageNumber: number;

        operateur: "ET" | "OU";

        typePagination: string;

        fromAdvancedRecherche: boolean;

    };

    fond: string;

}
