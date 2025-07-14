package com.travel.agency.controller;

import com.travel.agency.dto.TripDTO;
import com.travel.agency.services.TripService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin(origins = "http://localhost:4200")
public class TripController {

    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    // GET /api/trips
    @GetMapping
    public ResponseEntity<List<TripDTO>> getAllTrips() {
        List<TripDTO> trips = tripService.getAllTrips();
        return ResponseEntity.ok(trips);
    }

    // GET /api/trips/{id}
    @GetMapping("/{id}")
    public ResponseEntity<TripDTO> getTripById(@PathVariable Long id) {
        TripDTO trip = tripService.getTripById(id);
        return ResponseEntity.ok(trip);
    }

    // GET /api/trips/city/{cityId}
    @GetMapping("/city/{cityId}")
    public ResponseEntity<List<TripDTO>> getTripsByCity(@PathVariable Long cityId) {
        List<TripDTO> trips = tripService.getTripsByCity(cityId);
        return ResponseEntity.ok(trips);
    }

    // POST /api/trips
    @PostMapping
    public ResponseEntity<TripDTO> createTrip(@RequestBody TripDTO tripDTO) {
        TripDTO createdTrip = tripService.createTrip(tripDTO);
        return ResponseEntity.ok(createdTrip);
    }

    // PUT /api/trips/{id}
    @PutMapping("/{id}")
    public ResponseEntity<TripDTO> updateTrip(@PathVariable Long id, @RequestBody TripDTO tripDTO) {
        TripDTO updatedTrip = tripService.updateTrip(id, tripDTO);
        return ResponseEntity.ok(updatedTrip);
    }

    // DELETE /api/trips/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrip(@PathVariable Long id) {
        tripService.deleteTrip(id);
        return ResponseEntity.noContent().build();
    }
}