using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Proba.Migrations
{
    public partial class V5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DatumO",
                table: "Rezervacija");

            migrationBuilder.DropColumn(
                name: "DatumP",
                table: "Rezervacija");

            migrationBuilder.AddColumn<DateTime>(
                name: "DatumOdjavljivanja",
                table: "Rezervacija",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DatumPrijavljivanja",
                table: "Rezervacija",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DatumOdjavljivanja",
                table: "Rezervacija");

            migrationBuilder.DropColumn(
                name: "DatumPrijavljivanja",
                table: "Rezervacija");

            migrationBuilder.AddColumn<string>(
                name: "DatumO",
                table: "Rezervacija",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DatumP",
                table: "Rezervacija",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
