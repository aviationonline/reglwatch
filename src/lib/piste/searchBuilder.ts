import {
  SearchRequest,
  SearchField,
  SearchCriterion
} from "./types";

export class SearchBuilder {

  private fond = "ALL";

  private pageNumber = 1;

  private pageSize = 20;

  private fields: SearchField[] = [];

  public setFond(fond: string) {

    this.fond = fond;

    return this;

  }

  public setPage(page: number) {

    this.pageNumber = page;

    return this;

  }

  public setPageSize(size: number) {

    this.pageSize = size;

    return this;

  }

  public addTitleContains(text: string) {

    const criterion: SearchCriterion = {

      valeur: text,

      operateur: "ET",

      typeRecherche: "UN_DES_MOTS"

    };

    this.fields.push({

      typeChamp: "TITLE",

      operateur: "ET",

      criteres: [criterion]

    });

    return this;

  }

  public build(): SearchRequest {

    return {

      fond: this.fond,

      recherche: {

        filtres: [],

        champs: this.fields,

        sort: "SIGNATURE_DATE_DESC",

        secondSort: "ID",

        pageSize: this.pageSize,

        pageNumber: this.pageNumber,

        operateur: "ET",

        typePagination: "DEFAUT",

        fromAdvancedRecherche: false

      }

    };

  }

}
