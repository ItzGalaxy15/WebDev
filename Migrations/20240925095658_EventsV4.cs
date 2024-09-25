using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StarterKit.Migrations
{
    /// <inheritdoc />
    public partial class EventsV4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Event_Attendance_UserId",
                table: "Event_Attendance",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Event_Attendance_User_UserId",
                table: "Event_Attendance",
                column: "UserId",
                principalTable: "User",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Event_Attendance_User_UserId",
                table: "Event_Attendance");

            migrationBuilder.DropIndex(
                name: "IX_Event_Attendance_UserId",
                table: "Event_Attendance");
        }
    }
}
