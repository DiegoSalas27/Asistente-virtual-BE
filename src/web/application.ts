import { DBContext } from "@data/db.context";
import {
  CitasMedicasService,
  DoctoresService,
  EspecialidadesService,
  FechasAtencionService,
  HorariosService,
  PacientesService,
} from "@logic/services/impl";
import "@web/controllers";
import { Application } from "@web/lib/abstract-application";
import express from "express";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import morgan from "morgan";
import { ErrorHandlerMiddleware } from "./middlewares";

export class App extends Application {
  configureServices(container: Container): void {
    container.bind(DBContext).toSelf();
    container.bind(DoctoresService).toSelf();
    container.bind(EspecialidadesService).toSelf();
    container.bind(HorariosService).toSelf();
    container.bind(FechasAtencionService).toSelf();
    container.bind(PacientesService).toSelf();
    container.bind(CitasMedicasService).toSelf();
  }
  setup(): void | Promise<void> {
    const dbContext = this._container.get(DBContext);

    dbContext.getConnection();

    const server = new InversifyExpressServer(this._container);

    server.setErrorConfig((app) => {
      app.use(ErrorHandlerMiddleware.handleError());
    });

    server.setConfig((app) => {
      app.use(express.json());
      app.use(morgan("dev"));
    });

    const app = server.build();

    app.listen(process.env.PORT, () => {
      console.log(`server is running on http://localhost:${process.env.PORT}`);
    });
  }
}
