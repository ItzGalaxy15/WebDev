using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace StarterKit.Migrations
{
    /// <inheritdoc />
    public partial class MessageV1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Message",
                columns: table => new
                {
                    MessageId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Content = table.Column<string>(type: "TEXT", nullable: false),
                    ToUserId = table.Column<int>(type: "INTEGER", nullable: false),
                    FromUserId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Message", x => x.MessageId);
                });

            migrationBuilder.InsertData(
                table: "Message",
                columns: new[] { "MessageId", "Content", "Date", "FromUserId", "ToUserId" },
                values: new object[,]
                {
                    { 1, "Hello Amer!", new DateTime(2024, 10, 4, 16, 15, 0, 0, DateTimeKind.Unspecified), 1, 2 },
                    { 2, "Hello Max!", new DateTime(2024, 10, 4, 16, 20, 0, 0, DateTimeKind.Unspecified), 2, 1 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Message_MessageId",
                table: "Message",
                column: "MessageId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Message");
        }
    }
}
