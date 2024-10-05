using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StarterKit.Migrations
{
    /// <inheritdoc />
    public partial class MessageV2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "BeenRead",
                table: "Message",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "Message",
                keyColumn: "MessageId",
                keyValue: 1,
                column: "BeenRead",
                value: true);

            migrationBuilder.UpdateData(
                table: "Message",
                keyColumn: "MessageId",
                keyValue: 2,
                column: "BeenRead",
                value: false);

            migrationBuilder.InsertData(
                table: "Message",
                columns: new[] { "MessageId", "BeenRead", "Content", "Date", "FromUserId", "ToUserId" },
                values: new object[] { 3, false, "ohio", new DateTime(2024, 10, 4, 16, 20, 0, 0, DateTimeKind.Unspecified), 2, 4 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Message",
                keyColumn: "MessageId",
                keyValue: 3);

            migrationBuilder.DropColumn(
                name: "BeenRead",
                table: "Message");
        }
    }
}
