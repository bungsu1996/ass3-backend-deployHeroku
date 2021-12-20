import express, { Express, Request } from "express";

interface I_auth extends Request {
  userData?: String;
}

export default I_auth;
